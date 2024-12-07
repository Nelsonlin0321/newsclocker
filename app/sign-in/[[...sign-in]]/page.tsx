import { SignIn } from "@clerk/nextjs";

interface Props {
  searchParams: { nextUrl: string };
}

const page = ({ searchParams: { nextUrl } }: Props) => {
  return (
    <div className="flex justify-center p-5">
      <SignIn forceRedirectUrl={nextUrl || "/"} />
    </div>
  );
};

export default page;
