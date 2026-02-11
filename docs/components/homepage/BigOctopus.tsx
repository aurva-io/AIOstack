import { SectionHeader, CopyField, Container } from "@/components/navigation/core-ui";
import Image from "next/image";

export function BigOctopus() {
    return (
        <section id="solutiongraph" className="pt-4 sm:pt-0 pb-6 sm:pb-8">
            <Container>
                <div className="text-center">
                    <section className="relative mt-10 sm:mt-12 flex flex-col items-center justify-start">
                        {(
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none">
                                <Image
                                    src="/bg1.svg"
                                    alt="Background"
                                    width={1000}
                                    height={800}
                                    className="w-full h-auto opacity-50"
                                />
                            </div>
                        )}

                        {/* <Container className="relative z-10">
                            <div className="relative flex items-center justify-center ease-out" >
                                <Image
                                    src="/aiostack-graph.svg"
                                    alt="AIOStack heartbeat"
                                    width={900}
                                    height={900}
                                    className="w-full max-w-5xl  opacity-100 h-auto drop-shadow-xl relative z-10"
                                />
                            </div>
                        </Container> */}
                    </section>
                </div>
            </Container>
        </section>
    );
}