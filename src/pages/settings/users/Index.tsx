import React, { useState, useEffect } from "react";
import withAxios from "../../../HOC/withAxios";
import Box from "@mui/material/Box";
import type { UsersIndexProps } from "../../../types/pages";
import { useAppSelector } from "../../../store/hooks";
import { log } from "../../../funcs/helpers";
import TableSkeleton from "../../../components/skeletons/TableSkeleton";
import Breadcrumb from "../../../components/utilities/Breadcrumb";
import Heading from "../../../components/utilities/Heading";
import IndexListing from "./components/IndexListing";
import Add from "./components/Add";
import menu from "../../../objects/menu";
import { usersListing } from "../../../objects/apiResponses";

const Index = (props: UsersIndexProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [usersCreatedCount, setUsersCreatedCount] = useState<number>(0);

  const userInfo = useAppSelector((state) => state.user);

  const breadCrumb = menu[3].children![0].breadCrumb;

  const buttonInfo = {
    value: "Add New",
    onClick: () => setOpenDialog(true),
  };

  const setParentState = {
    setSnackbarInfo: props.setSnackbarInfo,
    setShowSnackBar: props.setShowSnackBar,
    setUsersCreatedCount,
  };

  useEffect(() => {
    const requestController = new AbortController();

    setIsLoading(true);

    /*
     * As API server is shut down, we won't call API
     */
    /*
    props.authAxios({...props._(props.apiEndPoints.users.list, {id: userInfo.user.account.uuid}), signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);
        
        setData(successResponse.users);
        setIsLoading(false);

        setOpenDialog(false);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })
    */
    props.setShowSnackBar(false);

    const successResponse = usersListing;
    log(successResponse);

    setData(successResponse.users);
    setIsLoading(false);

    setOpenDialog(false);

    return () => {
      requestController.abort("Request aborted to clean up useEffect.");
    };
  }, [usersCreatedCount]);

  log("Users listing rendered");

  return (
    <Box>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <Breadcrumb path={breadCrumb} />
          <Heading title="Users" button={buttonInfo} />
          <Add
            open={openDialog}
            close={() => setOpenDialog(false)}
            setParentState={setParentState}
          />
          <IndexListing data={data} />
        </>
      )}
    </Box>
  );
};

export default withAxios<UsersIndexProps>(Index);
