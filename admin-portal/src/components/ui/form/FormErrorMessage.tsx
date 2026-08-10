import { FieldValues,FieldErrors,Path } from 'react-hook-form';
interface FormErrorTypes<T extends FieldValues>{
    name:Path<T>;
    errors:FieldErrors<T>;
    touched?:boolean;
    required?:boolean;
}
export default function FormErrorMessage<T extends FieldValues>({name,errors,touched,required}:FormErrorTypes<T>) {
    if(!touched || !errors[name] || required) return null;
    return <p className='text-red-500 text-sm'>{String(errors[name]?.message)}</p>
}
