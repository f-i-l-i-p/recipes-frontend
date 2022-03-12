import { Toolbar, Box } from "@mui/material";
import { historyEvent } from "./navigationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import React from "react";
import NavDrawer from "./NavDrawer";
import { BrowserView, MobileView } from "react-device-detect";
import Stack from "@material-ui/core/Stack";
import NavBottom from "./NavBottom";
import MobileAppBar from "./MobileAppBar";
import DesktopAppBar from "./DesktopAppBar";

function Navigation() {
    const dispatch = useAppDispatch()
    const pages = useAppSelector((state) => state.navigation.pages)
    const currentPageIndex = useAppSelector((state) => state.navigation.currentPageIndex)
    const showNavigation = useAppSelector((state) => state.navigation.showNavigation)

    const currentPage = pages[currentPageIndex].page

    React.useEffect(() => {
        // Listen for popstate events to handle back/forward.
        window.addEventListener('popstate', function (event: PopStateEvent) {
            dispatch(historyEvent(event))
        })
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>

            <MobileView style={{ width: "100%" }}>
                <MobileAppBar />
                <Box sx={{ width: "100%", minHeight: "100vh" }}>
                    <Toolbar />
                    {currentPage}
                    {showNavigation &&
                        <Toolbar />
                    }
                </Box>
                {showNavigation &&
                    <NavBottom />
                }
            </MobileView>

            <BrowserView style={{ width: "100%" }}>
                <Stack>
                    <DesktopAppBar />
                    <Stack direction="row">
                        {showNavigation &&
                            <NavDrawer />
                        }
                        <Box sx={{ width: "100%" }}>
                            <Toolbar />
                            {currentPage}
                        </Box>
                    </Stack>
                </Stack>
            </BrowserView>
        </Box>
    );
}

export default Navigation