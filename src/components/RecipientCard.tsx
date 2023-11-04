import { getNFTAddress } from "@/util/getContractAddress";
import { useContract, useTransferNFT } from "@thirdweb-dev/react";
import { type FC } from "react";

interface RecipientCardProps {
  address: string;
  onUpdateAddress: (newPrice: string) => void;
  id: string;
}

const RecipientCard: FC<RecipientCardProps> = ({address, onUpdateAddress, id}) => {
  const { contract } = useContract(getNFTAddress());
  const { mutate: transferNFT, isLoading, error } = useTransferNFT(contract);

  const handleAddresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateAddress(event.target.value);
  };

  console.log(address);
  

  return (
    <div className="relative bg-gray-800 text-white p-6 rounded-lg w-full shadow-md mt-4">
      <h1 className="text-2xl font-semibold mb-2 ">Recipient Address</h1>

      <div>
        <label className="font-bold text-xl">Address</label>
        <input
          className="bg-gray-800 w-full"
          placeholder="Recipient Address"
          value={address}
          onChange={handleAddresChange}
        />
      </div>
      <button
        disabled={isLoading}
        onClick={() => transferNFT({
          to: address,
          tokenId: id
        })}
        className="mt-4 bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Transfer
      </button>
    </div>
  );
};
export default RecipientCard;
