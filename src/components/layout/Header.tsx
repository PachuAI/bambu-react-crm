import { APP_NAME } from "@/constants/config";

const Header = () => {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-neutral-900">
          {APP_NAME}
        </h1>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <a 
                href="#" 
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Inicio
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Acerca
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;