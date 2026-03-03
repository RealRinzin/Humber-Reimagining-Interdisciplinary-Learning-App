
const CourseTitle = async () => {
  const res = await fetch('https://fakestoreapiserver.reactbd.org/api/users');
  const data = await res.json();
  console.log(data);
  return (
    <h1 className='text-xl'>Intro to Spaces</h1>
  )
}
export default CourseTitle;