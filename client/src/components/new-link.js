import { IoIosAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
function NewLink() {
  return (
    <Link to='/new'>
      <div className='home__new--button'>
        <center>
          <IoIosAddCircleOutline />
        </center>
      </div>
    </Link>
  );
}

export default NewLink;
