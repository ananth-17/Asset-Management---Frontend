import { RouterProvider } from "react-router-dom";
import router from "@/lib/router";
import { Suspense } from "react";
// import { RefreshProvider } from "./lib/contexts/RefreshContext";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

function App() {
  return (
    <>
      <Suspense
        fallback={
          <p className="text-4xl font-extrabold h-screen flex items-center justify-center">
            loading..
          </p>
        }
      >
        <main className="min-h-screen bg-[#F3F4F6] antialiased font-loader ">
          {/* <RefreshProvider> */}
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
          {/* </RefreshProvider> */}
        </main>
      </Suspense>
    </>
  );
}

export default App;
