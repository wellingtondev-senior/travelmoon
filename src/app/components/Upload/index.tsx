import { BsCloudUpload } from "react-icons/bs";

// TYpes
import { UploadProps } from "@/app/types"

export function Upload({ children, ...props}: UploadProps) {
    return (   
        <div>
           <label>{props.title}</label>
           <div className="flex items-center justify-center w-full mb-6 mt-2">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        
                        <BsCloudUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"/>

                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>
                        </p>
                    
                        <p className="text-xs text-gray-500 dark:text-gray-400">{children}</p>
                    </div>

                    <input {...props} id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> 
        </div>
    )
}

