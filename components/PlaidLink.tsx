"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useBanking } from "./banking-provider";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const { actions } = useBanking();
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    setIsConnecting(true);
    actions.connectBank(`${user.firstName}'s Banking America`);
    await new Promise((resolve) => setTimeout(resolve, 650));
    router.push("/dashboard");
    setIsConnecting(false);
  };

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={connect}
          disabled={isConnecting}
          className="plaidlink-primary"
        >
          {isConnecting ? "Connecting..." : "Connect account"}
        </Button>
      ) : variant === "ghost" ? (
        <Button
          onClick={connect}
          variant="ghost"
          className="plaidlink-ghost"
          disabled={isConnecting}
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="hidden text-[16px] font-semibold text-black-2 xl:block">
            {isConnecting ? "Connecting..." : "Connect account"}
          </p>
        </Button>
      ) : (
        <Button
          onClick={connect}
          className="plaidlink-default"
          disabled={isConnecting}
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-semibold text-black-2">
            {isConnecting ? "Connecting..." : "Connect account"}
          </p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
