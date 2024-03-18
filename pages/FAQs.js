import { Accordion } from "flowbite-react";
import Head from "next/head";
import { HiOutlineArrowCircleDown } from "react-icons/hi";
import TextEditorView from "../components/textEditorView";

export async function getServerSideProps({ req }) {
  const data = await fetch(`${process.env.HOST}/api/faq/get`);
  const res = await data.json();

  return {
    props: {
      faqs: res,
    },
  };
}

const FAQ = ({ faqs }) => {
  return (
    <>
      <Head>
        <title>FAQ's</title>
      </Head>
      <div className="w-full bg-gray-100 min-h-screen">
        <div className=" lg:max-w-6xl bg-white mx-auto p-5  min-h-screen">
          <div className="text-center space-y-3">
            <h1 className="text-sm font-medium capitalize">FAQs</h1>
            <h1 className="text-4xl font-serif">Frequently Asked questions</h1>
            <h5 className="text-md font-normal text-gray-500">
              Have questions? We are here to help you
            </h5>
          </div>
          <div className="py-5 md:p-20">
            <Accordion
              flush={true}
              alwaysOpen={true}
              arrowIcon={HiOutlineArrowCircleDown}
            >
              {faqs?.length > 0 &&
                faqs.map((item) => (
                  <Accordion.Panel key={item._id}>
                    <Accordion.Title className="font-bold">
                      {item.question}
                    </Accordion.Title>
                    <Accordion.Content>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        <TextEditorView desc={item.answer} />
                      </p>
                    </Accordion.Content>
                  </Accordion.Panel>
                ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
