import {Link} from "react-router-dom";

function Notfound () {
    return(
        <div>
            <h1>페이지를 찾을 수 없습니다.</h1>
            <Link to="/"> 메인 페이지로 돌아가기 </Link>
        </div>
        
    )
}


export default Notfound;