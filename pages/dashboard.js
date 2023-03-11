import Card from "./components/Card";
import Link from "next/link";
import Head from "next/head";
import router from "next/router";

export default function Home() {
  return (
    <div className="w-full">
      <Head>
        <title>SaaS examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Filter responseResults={responseResults} /> */}
      <div>
        <div className="w-full">
          <div className="text-xl font-extrabold leading-6 mx-24 mt-10 w-fit p-2 px-6 bg-gradient-to-r from-green-200 to-blue-400 rounded-lg">
            Web Pages
          </div>

          {/* <div className="grid gap-y-10 grid-cols-3 grid-flow-row-dense px-16 py-10">
            {UniqueTag.map((page) => (
              <Card name={page.tag} />
            ))}
          </div> */}
          <div className="grid gap-y-10 grid-cols-3 grid-flow-row-dense px-14 ml-10 py-7">
            <button
              type="button"
              className="w-80"
              onClick={() => {
                router.push({
                  pathname: '/pages/notfound',
                  query: { name: '404', count: '55' },
                });
              }}
            >
              <Card name="404" count="55" />
            </button>
            <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/pricing")}
            >
              <Card name="Pricing" count="66" />
            </button>
            <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/aboutpage")}
            >
              <Card name="About" count="55" />
            </button>

            <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/careers")}
            >
              <Card name="Careers" count="50" />
            </button>
            <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/landing")}
            >
              <Card name="Landing" count="75" />
            </button>
            <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/usecase")}
            >
              <Card name="Usecases" count="30" />
            </button>
            <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/feature")}
            >
              <Card name="Feature" count="55" />
            </button>
          </div>
          <div className="text-xl font-extrabold leading-6 mx-24 mt-10 w-fit p-2 px-6 bg-gradient-to-r from-green-200 to-blue-400 rounded-lg">
            Product Pages
          </div>
          <div className="grid gap-y-10 grid-cols-3 grid-flow-row-dense px-14 ml-10 py-7">
            <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/onboarding")}
            >
              <Card name="User Onboarding" count="35" />
            </button>
            <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/signup")}
            >
              <Card name="Signup" count="60" />
            </button>
            <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/login")}
            >
              <Card name="Login" count="65" />
            </button>
            {/* <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/billing")}
            >
              <Card name="Billing&subcription" />
            </button> */}
            {/* <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/dashboard")}
            >
              <Card name="Dashboard" />
            </button> */}
            {/* <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/inAppPricing")}
            >
              <Card name="In-App Pricing" />
            </button> */}

            {/* <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/setting")}
            >
              <Card name="Settings" />
            </button> */}

            {/* <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/userprofile")}
            >
              <Card name="User Profile" />
            </button> */}
            {/* <button
              type="button"
              className="w-80"
              onClick={() => (window.location.href = "/pages/emptyState")}
            >
              <Card name="Empty State" />
            </button> */}
          </div>
          {/* <Link href="/login" passHref>
            <Card name="login" />
          </Link> */}
        </div>
      </div>
    </div>
  );
}
