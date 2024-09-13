import {sdk} from "../graphql/sdk";
import {useRouter} from "next/router";
import {useLocalStorage} from "../../utils/hooks/use-local-storage";

export const useNavGuard = ()=>{
    const Router = useRouter();

    const {data} = sdk().useGetMe()
    const roles = data?.getMe.rolesJWT??[];
    const [classicUserMode, setClassicUSerMode] = useLocalStorage(
        "classicUserMode",
        "0"
    );
    console.log('roles',roles);
    if (Router.pathname.match('admin')){
        if (roles.includes('anon')){
            document.location.href='/cresco/login'
        }
        if (roles.includes('customer')){
            document.location.href='/cresco/login'
        }
        // if (Router.pathname.match('admin/admins')&&!roles.includes('superadmin')){
        //     document.location.href='/cresco/admin/customers'
        // }
    }
    else {
        if (classicUserMode=="1"){
            //classic customer
        } else {
            if (roles.includes('anon')){
                document.location.href='/cresco/login'
            }
            if (roles.includes('admin')||roles.includes('super_admin')||roles.includes('dismissed')){
                document.location.href='/cresco/admin/customers'
            }
        }

    }


    return roles
}