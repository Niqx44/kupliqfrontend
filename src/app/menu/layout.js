import NavbarMenu from "../components/NavbarMenu";

export const metadata = {
  title: "Menu - Kupliq Cafe",
  description: "Daftar menu makanan dan minuman Kupliq Cafe",
};

export default function AuthLayout({ children }) {
  return (
    <div className="bg-white text-black dark:text-white">
      {children}
    </div>
  );
}