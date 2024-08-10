import React from "react";

const HomePage = () => {
  return <div>HomePage</div>;
};

export default HomePage;

export async function generateStaticParams() {
  return [{ folder: [] }, { folder: [] }];
}
