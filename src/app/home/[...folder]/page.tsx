import React from "react";

const HomePage = ({ params }: { params: { folder: string[] } }) => {
  console.log(params);
  return <div>HomePage</div>;
};

export default HomePage;

export async function generateStaticParams() {
  return [
    { folder: ["test", "subtest"] }, // home/test/subtest
    { folder: ["testing", "subtesting"] },
  ];
}
