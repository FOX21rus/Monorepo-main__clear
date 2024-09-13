import {sdk} from "../../../../data/graphql/sdk";
import {ExclamationIcon} from "@heroicons/react/solid";
import {useLocalStorage} from "../../../../utils/hooks/use-local-storage";

export const CrescoUnverifiedNotice = ()=>{
    const {data} = sdk().useCrescoCustomerGetMyProfile()
    const isVerified = data?.crescoCustomerGetMyProfile?.isPassportVerified
    const [classicUserMode, setClassicUSerMode] = useLocalStorage(
        "classicUserMode",
        "0"
    );
    if (data&&!isVerified&&!classicUserMode)
        return  <div className="rounded-md bg-yellow-50 p-4 mb-10">
        <div className="flex">
            <div className="flex-shrink-0">
                <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Unverified profile</h3>
                <div className="mt-2 text-sm text-yellow-700">
                    <p>
                        You will get full access to your <a className={"underline underline-offset-2"} href={"/cresco/cabinet/profile"}>profile</a> as soon as it will be verified, after you upload your passport
                    </p>
                </div>
            </div>
        </div>
    </div>

    return null;
}