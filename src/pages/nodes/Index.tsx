import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Heading from "../../components/utilities/Heading";
import IndexListing from "./components/IndexListing";
import Breadcrumb from "../../components/utilities/Breadcrumb";
import { log } from "../../funcs/helpers";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import withAxios from "../../HOC/withAxios";
import type { NodesIndexProps } from "../../types/pages";
import menu from "../../objects/menu";
import { nodes } from "../../objects/apiResponses";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Index = (props: NodesIndexProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Record<string, any>[]>([]);

  const userInfo = useAppSelector((state) => state.user);

  const breadCrumb = menu[1].breadCrumb!;

  useEffect(() => {
    const data = {
      limit: 20,
      page: 1,
      customer: userInfo.user.account.uuid,
    };
    const requestController = new AbortController();

    /*
     * As API server is shut down, we won't call API
     */
    /*
    props
      .authAxios({
        ...props.apiEndPoints.nodes.list,
        params: data,
        signal: requestController.signal,
      })
      .then((res) => {
        props.setShowSnackBar(false);
        const successResponse = res.data;
        log(successResponse);
        setData(successResponse);
        setIsLoading(false);
      })
      .catch((error) => {
        props.processAxiosError(error, props);
      });
      */
    props.setShowSnackBar(false);

    const successResponse = nodes;
    log(successResponse);

    setData(successResponse);
    setIsLoading(false);

    return () => {
      requestController.abort("Request aborted to clean up useEffect.");
    };
  }, []);

  log("Node rendered");

  return (
    <Box>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <Breadcrumb path={breadCrumb} />
          <Heading title="Nodes" />
          <IndexListing data={data} />
        </>
      )}
    </Box>
  );
};

export default withAxios<NodesIndexProps>(Index);
