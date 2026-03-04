
const CourseTitle = async () => {
  const res = await fetch('https://dummyjson.com/users');
  const data = await res.json();
  console.log(data);
  return (
    <h1 className='text-2xl font-bold bg-gray-200 p-2 rounded'>Intro to Spaces</h1>
  )
}
export default CourseTitle;