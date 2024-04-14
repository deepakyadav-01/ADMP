/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
//import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

//top contrbutors for project dashboard
const TopContributors = ({ contributors, commits, pullRequests }) => {
  const [contributorData, setContributorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sorting: {
      field: "title",
      order: "ascend",
    },
    filters: {},
  });

  useEffect(() => {
    setLoading(true);
    const { pagination, sorting, filters } = tableParams;
    const params = {
      ...pagination,
      ...sorting,
      ...filters,
    };
    if (!Array.isArray(contributors)) {
      // Handle error
      console.error("Contributors is not an array");
      setLoading(false);
      return;
    }
    Promise.all(
      contributors.map((contributor) => {
        const contributorCommits = Array.isArray(commits)
          ? commits.filter(
              (commit) =>
                commit.author && commit.author.login === contributor.login
            ).length
          : 0;
        const contributorPullRequests = Array.isArray(pullRequests)
          ? pullRequests.filter(
              (pr) => pr.user && pr.user.login === contributor.login
            ).length
          : 0;
        return Promise.resolve({
          ...contributor,
          commits: contributorCommits,
          pullRequests: contributorPullRequests,
        });
      }),
      params
    )
      .then((data) => {
        setContributorData(data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...pagination,
            total: data.totalCount,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching contributor data:", error);
        setLoading(false);
      });
  }, [contributors, commits, pullRequests]);

  const handleTableChange = (pagination, filters, sorter) => {
    const updatedTableParams = {
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
      sorting: {
        field: sorter.field || "login", // Default sorting field
        order: sorter.order || "ascend", // Default sorting order
      },
      filters,
    };
    setTableParams(updatedTableParams);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "S. No.",
      dataIndex: "index",
      render: (text, record, index) => (
        <div className="ml-3"> {index + 1} </div>
      ), // Render serial number
    },
    {
      title: "Username",
      dataIndex: "login",
      key: "login",
      sorter: (a, b) =>
        a.login.localeCompare(b.login, "en", { sensitivity: "base" }),
      ...getColumnSearchProps("login"),
      render: (text) => (
        <a
          href={`https://github.com/${text}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Commits",
      dataIndex: "commits",
      key: "commits",
      sorter: (a, b) => a.commits - b.commits,
    },
    {
      title: "Pull Requests",
      dataIndex: "pullRequests",
      key: "pullRequests",
      sorter: (a, b) => a.pullRequests - b.pullRequests,
    },
  ];
  const modifiedData = contributorData.map((item, index) => ({
    ...item,
    index: index + 1, // Add index property to each item
    key: item._id, // Assuming 'id' is the unique identifier for each project
  }));
  return (
    <div>
      <Table
        className="w-full border border-gray-300 overflow-x-auto mb-10"
        dataSource={modifiedData}
        columns={columns}
        loading={loading}
        rowKey="login"
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TopContributors;
