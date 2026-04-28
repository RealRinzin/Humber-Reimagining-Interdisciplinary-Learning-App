
const CourseTitle = async ({title}:{title:string}) => {
  return (
    <h1 className='text-3xl font-bold bg-gray-200 p-8 rounded-xl'>{title}</h1>
  )
}
export default CourseTitle;