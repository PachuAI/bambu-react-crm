import Button from "@/components/ui/Button";

const HomePage = () => {
  return (
    <main className="container mx-auto p-6">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Bienvenido</h1>
        <p className="text-neutral-600">
          Base React + Vite + TS + Tailwind v4 configurada correctamente.
        </p>
        <Button variant="primary">Empezar</Button>
      </section>
    </main>
  );
};

export default HomePage;