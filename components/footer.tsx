import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto bg-white">
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">NewsClocker</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your personalized news subscription platform
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div> */}
        <div className="py-4 text-center text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} NewsClocker.{" "}
          <Link href={"/privacy"}>
            <span className="py-4 text-center text-sm text-gray-600 dark:text-gray-300">
              Privacy & terms
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
