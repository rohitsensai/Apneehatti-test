import { Accordion } from "flowbite-react";
import Head from "next/head";
import dynamic from "next/dynamic";

const TextEditorView = dynamic(() => import("../components/textEditorView"), {
  ssr: false,
});

export async function getServerSideProps({ req }) {
  const data = await fetch(`${process.env.HOST}/api/policy/list`);
  const res = await data.json();

  return {
    props: {
      refund_policies:
        res.length > 0 ? res.filter((x) => x.type == "refund_policy") : [],
      cancellation_policies:
        res.length > 0
          ? res.filter((x) => x.type == "cancellation_policy")
          : [],
      exchange_policies:
        res.length > 0 ? res.filter((x) => x.type == "exchange_policy") : [],
    },
  };
}

const Policy = ({
  refund_policies,
  exchange_policies,
  cancellation_policies,
}) => {
  return (
    <>
      <Head>
        <title>Policy</title>
      </Head>
      <div className="w-full bg-gray-100">
        <div className=" lg:max-w-6xl bg-white mx-auto p-5">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-medium capitalize font-serif">
              Policies
            </h1>
            <h5 className="text-md font-normal text-gray-500">
              We are here to help you
            </h5>
          </div>
          <div className="md:p-5">
            <Accordion flush={true}>
              <Accordion.Panel>
                <Accordion.Title>Refund Policy</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    We want you to be satisfied with your purchase. If you are
                    not completely satisfied, we offer a refund or exchange
                    policy for specific products as described below.
                  </p>

                  {refund_policies.length > 0 &&
                    refund_policies.map((item) => (
                      <div className="md:p-5 border-b-2">
                        <h2 className="text-md font-medium mb-2  underline">
                          {item.name}
                        </h2>
                        <div
                          className="md:p-5 overflow-scroll"
                          dangerouslySetInnerHTML={{ __html: item?.table }}
                        ></div>
                        <TextEditorView desc={item.description} />
                      </div>
                    ))}
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Cancellation Policy</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    We want you to be satisfied with your purchase. If you are
                    not completely satisfied, we offer a cancellation policy for
                    specific products as described below.
                  </p>

                  {cancellation_policies.length > 0 &&
                    cancellation_policies.map((item) => (
                      <div className="md:p-5 border-b-2">
                        <h2 className="text-md font-medium mb-2  underline">
                          {item.name}
                        </h2>
                        <div
                          className="md:p-5 overflow-scroll"
                          dangerouslySetInnerHTML={{ __html: item?.table }}
                        ></div>
                        <TextEditorView desc={item.description} />
                      </div>
                    ))}
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Exchange Policy</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    We want you to be satisfied with your purchase. If you are
                    not completely satisfied, we offer a exchange policy for
                    specific products as described below.
                  </p>

                  {exchange_policies.length > 0 &&
                    exchange_policies.map((item) => (
                      <div className="md:p-5 border-b-2">
                        <h2 className="text-md font-medium mb-2  underline">
                          {item.name}
                        </h2>
                        <div
                          className="md:p-5 overflow-scroll"
                          dangerouslySetInnerHTML={{ __html: item?.table }}
                        ></div>
                        <TextEditorView desc={item.description} />
                      </div>
                    ))}
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default Policy;
