import React from "react";

// Components
import { Quiz } from "@/app/components/Quiz";

export default function Viagens() {
    return (
        <div className="container mx-auto">
            <div className="py-20 px-8 lg:py-20 lg:px-8">
            
                <h1 className="mb-14 text-5xl md:mb-56 lg:text-9xl lg:mb-72 text-purple">Trip <br/> Finder</h1>
                
                <hr className="divide-y border-purple"/>

                <div className="mt-6">
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className="col-auto">
                            <span className="text-sm md:text-xl text-purple"></span>
                        </div>

                        <div className="grid-cols-1">
                            <p className="text-sm md:text-xl mb-4 text-purple"> 
                                After touching down in Bali, your heavenly Indonesia trip will begin at one of our
                                favourite cliffside retreats, Six Senses Uluwatu. A place that exceeds perfection, 
                                the next two days are to de-stress and unwind post wedding.
                            </p>
                            <p className="text-sm md:text-xl mb-4 text-purple">
                                After touching down in Bali, your heavenly Indonesia trip will begin at one of our favourite cliffside retreats, 
                                Six Senses Uluwatu. A place that exceeds perfection, the next two days are to de-stress and unwind post wedding. 
                            </p>
                            <p className="text-sm md:text-xl mb-16 text-purple">
                                After touching down in Bali, your heavenly Indonesia trip will begin at one of our favourite cliffside retreats, 
                                Six Senses Uluwatu. A place that exceeds perfection, the next two days are to de-stress and unwind post wedding.
                            </p>
                        </div>
                    </div>
                    
                    <Quiz />
                </div>
            </div>
        </div>
    )
} 