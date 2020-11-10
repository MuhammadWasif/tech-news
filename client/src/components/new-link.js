import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
function NewLink() {
  return (
    <div>
      <Link to='/new'>
        <IoMdAdd />
      </Link>
    </div>
  );
}

export default NewLink;
