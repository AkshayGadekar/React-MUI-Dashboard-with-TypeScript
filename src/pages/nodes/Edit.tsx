import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Breadcrumb from "../../components/utilities/Breadcrumb";
import Heading from "../../components/utilities/Heading";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { log } from "../../funcs/helpers";
import { useTheme } from "@mui/material/styles";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import withAxios from "../../HOC/withAxios";
import type { NodesEditProps } from "../../types/pages";
import EditSkeleton from "./components/EditSkeleton";
import { isLinkSame } from "../../funcs/helpers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import EditInfo from "./components/EditInfo";
import EditServices from "./components/EditServices";
import menu from "../../objects/menu";
import Typography from "@mui/material/Typography";
import { nodes } from "../../objects/apiResponses";

const Edit = (props: NodesEditProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Record<string, any>>({});

  const breadCrumb = menu[1].otherHrefs!.edit.breadCrumb;

  const param = useParams();
  const theme = useTheme();

  useEffect(() => {
    const requestController = new AbortController();

    /*
     * As API server is shut down, we won't call API
     */
    /*
    props.authAxios({...props._(props.apiEndPoints.nodes.edit, {id: param.id}), signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log('successResponse', successResponse);
        
        setData(successResponse);
        setIsLoading(false);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })
    */
    props.setShowSnackBar(false);

    const successResponse = nodes[0];
    log("successResponse", successResponse);

    setData(successResponse);
    setIsLoading(false);

    return () => {
      requestController.abort("Request aborted to clean up useEffect.");
    };
  }, []);

  return (
    <Box>
      {isLoading ? (
        <EditSkeleton />
      ) : (
        <>
          <Breadcrumb path={breadCrumb} />
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ [theme.breakpoints.up("md")]: { paddingRight: "1rem" } }}
            >
              <Grid container direction="column">
                <Grid item sx={{ marginBottom: "1.5rem" }}>
                  <EditInfo data={data!} />
                </Grid>
                <Grid item sx={{ marginBottom: "1.5rem" }}>
                  <Heading title="Customers" />
                  <Box
                    sx={{
                      width: "100%",
                      p: 2,
                      backgroundColor: "#fff",
                      boxShadow: (theme) => theme.shadows[1],
                    }}
                  >
                    <Grid container direction="column" spacing={3}>
                      <Grid item>
                        {data!.customers.map(
                          (customer: Record<string, any>, index: number) => (
                            <TextField
                              key={index}
                              variant="outlined"
                              InputProps={{ readOnly: true }}
                              value={customer.company_name}
                              fullWidth
                            />
                          )
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ [theme.breakpoints.up("md")]: { paddingLeft: "1rem" } }}
            >
              <Grid container direction="column">
                <Grid item sx={{ marginBottom: "1.5rem" }}>
                  <Heading title="Services" />
                  <EditServices data={data!.services} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default withAxios<NodesEditProps>(Edit);
