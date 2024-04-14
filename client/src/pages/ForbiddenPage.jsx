// ForbiddenPage
import { Link } from 'react-router-dom';
import {common,login} from "../lib/constants/string.json"

//forbiden page /access denied page
const ForbiddenPage = () => {
  return (
    <div className="container mx-auto my-10 text-center w-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">{common.accessDenied}</h1>
      <p className="text-gray-600">
        {common.forbidden}
      </p>
      <Link to="/" className="text-blue-700 font-semibold hover:underline mt-4 inline-block">
        {login.loginHeader}
      </Link>
    </div>
  );  
};

export default ForbiddenPage;
