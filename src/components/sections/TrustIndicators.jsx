import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const TrustIndicators = () => {
    return (
        <section className="border-y border-neutral-100 dark:border-neutral-800 bg-background-subtle dark:bg-neutral-900/50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-medium text-neutral-500 uppercase tracking-widest mb-8">
                    Trusted by Global Healthcare Providers
                </p>
                <StaggerContainer staggerDelay={0.05} className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <StaggerItem className="flex items-center gap-2 text-xl font-bold text-neutral-600">
                        <span className="material-icons-outlined">local_hospital</span> MEDLIFE
                    </StaggerItem>
                    <StaggerItem className="flex items-center gap-2 text-xl font-bold text-neutral-600">
                        <span className="material-icons-outlined">health_and_safety</span> CARECORP
                    </StaggerItem>
                    <StaggerItem className="flex items-center gap-2 text-xl font-bold text-neutral-600">
                        <span className="material-icons-outlined">medication</span> PHARMAHUB
                    </StaggerItem>
                    <StaggerItem className="flex items-center gap-2 text-xl font-bold text-neutral-600">
                        <span className="material-icons-outlined">medical_information</span> CLINIX
                    </StaggerItem>
                    <StaggerItem className="flex items-center gap-2 text-xl font-bold text-neutral-600">
                        <span className="material-icons-outlined">science</span> BIOLABS
                    </StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    );
};

export default TrustIndicators;
