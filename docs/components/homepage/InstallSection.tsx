import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader, CopyField, Container } from "@/components/navigation/core-ui";

export function InstallSection() {
    return (< section id="install" className="relative z-30   py-16 sm:py-32 overflow-hidden" >
        <Container>
            <SectionHeader
                title="Get started in minutes, not weeks"
                center
            />

            {/* Installation Tabs */}
            <div className="mx-auto max-w-xl">
                <Tabs defaultValue="install">
                    <TabsList className="w-full justify-center mb-0">
                        <TabsTrigger value="install">Install</TabsTrigger>
                        <TabsTrigger value="uninstall">Uninstall</TabsTrigger>
                    </TabsList>

                    <TabsContent value="install" className="pt-6">
                        <CopyField value="curl -fsSL https://aurva.ai/install.sh | bash" />
                    </TabsContent>
                    <TabsContent value="uninstall" className="pt-6">
                        <CopyField value="curl -fsSL https://aurva.ai/uninstall.sh | bash" />
                    </TabsContent>
                </Tabs>
            </div>

        </Container>
    </section >
    )
}
