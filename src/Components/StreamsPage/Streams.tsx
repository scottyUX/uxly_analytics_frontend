import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Header from "../HomePage/HomeComponents/HomeHeader";

import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const Streams: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const socket = io("http://18.223.123.138:5000", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log(`Socket connected: ${socket.id}`);
    });

    socket.on("USDT", (rawData) => {
      setData(rawData);
    });

    // Clean up the effect by disconnecting the socket when the component unmounts
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <section className="header-section">
        <Header />
      </section>
      <div className="flex min-h-screen items-center justify-center">
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Latest Transaction</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Latest Transaction</DrawerTitle>
                <DrawerDescription>
                  <p>time: {data?.time?.[0] ? ` ${data.time[0]}` : " N/A"}</p>
                  <p>from: {data?.from?.[0] ? ` ${data.from[0]}` : " N/A"}</p>
                  <p>to: {data?.to?.[0] ? ` ${data.to[0]}` : " N/A"}</p>
                  <p>
                    value: {data?.value?.[0] ? ` ${data.value[0]}` : " N/A"}
                  </p>
                  <p> decimal value: {data?.decimalValue?.[0] ?? " N/A"}</p>
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex-1 text-center">
                    <div className="text-4xl font-bold tracking-tighter">
                      {data?.averageDecimalValue ?? "NULL"}
                    </div>
                    <div className="text-muted-foreground text-[0.70rem] uppercase">
                      average transaction value (latest 100 transactions)
                    </div>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button>Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default Streams;
