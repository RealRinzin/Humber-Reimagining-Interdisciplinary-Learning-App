
const CourseTitle = async () => {
  const res = await fetch('http://127.0.0.1:8000/api/v1/videos');
  const data = await res.json();
  console.log(data);
  return (
    <h1 className='text-xl'>Intro to Spaces</h1>
  )
}
export default CourseTitle;