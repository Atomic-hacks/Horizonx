import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Copy from "./Copy";

const BankCard = ({ account, userName, showBalance = true }: CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="bank-card"
      >
        <div className="bank-card_content">
          <div>
            <p className="text-12 uppercase tracking-[0.24em] text-white/70">
              {account.subtype}
            </p>
            <h1 className="mt-2 text-16 font-semibold text-white">
              {account.name}
            </h1>
            <p className="font-ibm-plex-serif text-30 font-black text-white">
              {formatAmount(account.currentBalance)}
            </p>
          </div>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-white">
                {userName}
              </h1>
              <h2 className="text-12 font-semibold text-white">
                ●● / ●●
              </h2>
            </div>
            <p className="text-14 font-semibold tracking-[1.1px] text-white/90">
              ●●●● ●●●● ●●●● <span className="text-16">{account?.mask}</span>
            </p>
          </article>
        </div>

        <div className="bank-card_icon">
          <Image
            src="/icons/Paypass.svg"
            width={20}
            height={24}
            alt="pay"
          />
          <Image
            src="/icons/mastercard.svg"
            width={45}
            height={32}
            alt="mastercard"
            className="ml-5"
          />
        </div>

        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-overlay"
        />
      </Link>

      {showBalance && <Copy title={account?.shareableId || ""} />}
    </div>
  )
}

export default BankCard
