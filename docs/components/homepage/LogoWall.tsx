import { SectionHeader, CopyField, Container } from "@/components/navigation/core-ui";
import Image from "next/image";


export function SupportedLogoWall() {
    return (
        <Container className="py-8 sm:py-4 overflow-hidden">
            <SectionHeader
                eyebrow=""
                title="Discovers shadow AI across 100+ tools, models, and databases"
                subtitle=""
                center
            />

            <div className="sm:py-8 relative space-y-4 marquee-fade-mask">
                <div className="flex animate-scroll">
                    <div className="flex flex-shrink-0">
                        {[
                            { name: "gpt", file: "gpt.png" },
                            { name: "claude", file: "claude.png" },
                            { name: "k8s", file: "k8s.png" },
                            { name: "airflow", file: "airflow.png" },
                            { name: "mcp", file: "mcp.png" },
                            { name: "tflow", file: "tflow.png" },
                            { name: "pytorch", file: "pytorch.png" },



                        ].map((company, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
                            >
                                <Image
                                    src={`/integrations/${company.file}`}
                                    alt={company.name}
                                    width={60}
                                    height={24}
                                    className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                                    style={{}}
                                />

                            </div>
                        ))}
                    </div>

                    <div className="flex flex-shrink-0">
                        {[
                            { name: "gpt", file: "gpt.png" },
                            { name: "claude", file: "claude.png" },
                            { name: "k8s", file: "k8s.png" },
                            { name: "airflow", file: "airflow.png" },
                            { name: "mcp", file: "mcp.png" },
                            { name: "tflow", file: "tflow.png" },
                            { name: "pytorch", file: "pytorch.png" },

                        ].map((company, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
                            >
                                <Image
                                    src={`/integrations/${company.file}`}
                                    alt={company.name}
                                    width={60}
                                    height={24}
                                    className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                                    style={{}}
                                />

                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex animate-scroll-reverse">
                    <div className="flex flex-shrink-0">
                        {[
                            { name: "gpt", file: "psql.png" },
                            { name: "claude", file: "hf.png" },
                            { name: "k8s", file: "gemini.png" },
                            { name: "airflow", file: "weav.png" },
                            { name: "mcp", file: "milvus.png" },
                            { name: "tflow", file: "mlflow.png" },
                            { name: "pytorch", file: "chouse.png" },
                        ].map((company, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
                            >
                                <Image
                                    src={`/integrations/${company.file}`}
                                    alt={company.name}
                                    width={60}
                                    height={24}
                                    className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                                    style={{}}
                                />

                            </div>
                        ))}
                    </div>

                    <div className="flex flex-shrink-0">
                        {[
                            { name: "gpt", file: "psql.png" },
                            { name: "claude", file: "hf.png" },
                            { name: "k8s", file: "gemini.png" },
                            { name: "airflow", file: "weav.png" },
                            { name: "mcp", file: "milvus.png" },
                            { name: "tflow", file: "mlflow.png" },
                            { name: "pytorch", file: "chouse.png" },

                        ].map((company, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
                            >
                                <Image
                                    src={`/integrations/${company.file}`}
                                    alt={company.name}
                                    width={60}
                                    height={24}
                                    className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                                    style={{}}
                                />

                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex animate-scroll">
                    <div className="flex flex-shrink-0">
                        {[
                            { name: "gpt", file: "langch.png" },
                            { name: "claude", file: "mongo.png" },
                            { name: "k8s", file: "qq.png" },
                            { name: "airflow", file: "lakefs.png" },
                            { name: "mcp", file: "mcp.png" },
                            { name: "tflow", file: "temp.png" },
                            { name: "pytorch", file: "celery.png" },
                        ].map((company, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
                            >
                                <Image
                                    src={`/integrations/${company.file}`}
                                    alt={company.name}
                                    width={60}
                                    height={24}
                                    className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                                    style={{}}
                                />

                            </div>
                        ))}
                    </div>

                    <div className="flex flex-shrink-0">
                        {[
                            { name: "gpt", file: "langch.png" },
                            { name: "claude", file: "mongo.png" },
                            { name: "k8s", file: "qq.png" },
                            { name: "airflow", file: "lakefs.png" },
                            { name: "mcp", file: "mcp.png" },
                            { name: "tflow", file: "temp.png" },
                            { name: "pytorch", file: "celery.png" },

                        ].map((company, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex items-center justify-center p-2 sm:p-4 mx-2 sm:mx-4 rounded-xl border border-border/100 bg-card ring-1 ring-border/50 min-w-[90px] sm:min-w-[140px] h-16 sm:h-20 flex-shrink-0"
                            >
                                <Image
                                    src={`/integrations/${company.file}`}
                                    alt={company.name}
                                    width={60}
                                    height={24}
                                    className="w-auto h-auto max-w-[50px] sm:max-w-[80px] max-h-[20px] sm:max-h-[40px]"
                                    style={{}}
                                />

                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
  @keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
  }
  
  @keyframes scroll-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
  }
  
  @keyframes fade {
  to {
  opacity: 0;
  visibility: hidden;
  }
  }
  
  .marquee-fade-mask {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  }
  
  .animate-scroll {
  animation: scroll 20s linear infinite;
  display: flex;
  width: fit-content;
  }
  
  
  .animate-scroll-reverse {
  animation: scroll-reverse 20s linear infinite;
  display: flex;
  width: fit-content;
  }
  
  
  `}</style>

        </Container>
    )

}
