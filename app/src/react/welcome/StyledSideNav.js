import styled from 'styled-components';
import SideNav, {Nav, NavIcon, NavItem, NavText, Toggle} from '@trendmicro/react-sidenav';
import Theme from "../colors/index";


const NavHeader = styled.div`
    display: ${props => (props.expanded ? 'block' : 'none')};
    white-space: nowrap;
    background-color: ${Theme.base};
    color: #fff;
    > * {
        color: inherit;
        background-color: inherit;
    }
`;

// height: 20px + 10px + 10px = 40px
const NavTitle = styled.div`
    font-size: 1.5em;
    padding-top: 20px;
    padding-left: 40px;
`;


// SideNav
const StyledSideNav = styled(SideNav)`
    background-color: ${Theme.base};
    border-right: 1px solid ${Theme.white};
`;
StyledSideNav.defaultProps = SideNav.defaultProps;

// Toggle
const StyledToggle = styled(Toggle)`
    background-color: ${Theme.base};
`;
StyledToggle.defaultProps = Toggle.defaultProps;

// Nav
const StyledNav = styled(Nav)`
    background-color: ${Theme.base};
    &&[class*="expanded--"] {
        [class*="sidenav-subnav--"] {
            > [class*="sidenav-subnavitem--"],
            > [class*="sidenav-subnavitem--"]:hover {
                > [class*="navitem--"] {
                    color: #eee;
                }
            }
            > [class*="sidenav-subnavitem--"]:hover {
                > [class*="navitem--"] {
                    background-color: #f44161;
                }
            }
            > [class*="sidenav-subnavitem--"][class*="selected--"] {
                > [class*="navitem--"] {
                    color: #AF3136;
                }
                > [class*="navitem--"]::before {
                    border-left: 2px solid #AF3136;
                }
            }
        }
    }
    && > [class*="sidenav-navitem--"] {
        > [class*="navitem--"] {
            background-color: inherit;
            color: #EFAAAD;
            
            [class*="navicon--"] {
                &, > * {
                    vertical-align: middle
                    color: ${Theme.white};
                }
            }
            [class*="navtext--"] {
                &, > * {
                    font-size: 1.3em;
                    color: ${Theme.white};
                }
            }
        }
    }
    && > [class*="sidenav-navitem--"]:hover {
        > [class*="navitem--"] {
            background-color: ${Theme.base_lighter};
        }
    }
    && > [class*="sidenav-navitem--"],
    && > [class*="sidenav-navitem--"]:hover {
        > [class*="navitem--"] {
            [class*="navicon--"] {
                &, > * {
                    color: #fff;
                }
            }
            [class*="sidenav-nav-text--"] {
                &, > * {
                    color: #fff;
                }
            }
        }
    }
    && > [class*="sidenav-navitem--"][class*="highlighted--"] {
        > [class*="navitem--"] {
                background-color: ${Theme.base_darker};
            }
    },
    && > [class*="sidenav-navitem--"][class*="highlighted--"]:hover {
        > [class*="navitem--"] {
            [class*="navicon--"],
            [class*="navtext--"] {
                &, > * {
                    color: #fff;
                }
            }
            [class*="sidenav-nav-text--"] {
                font-weight: 700;
            }
        }
    }
`;
StyledNav.defaultProps = Nav.defaultProps;

// NavItem
const StyledNavItem = styled(NavItem)`
    &&&:hover {
        [class*="navtext--"] {
            color: #fff;
        }
    }
`;
StyledNavItem.defaultProps = NavItem.defaultProps;

// NavIcon
const StyledNavIcon = styled(NavIcon)`
    color: #222;
`;
StyledNavIcon.defaultProps = NavIcon.defaultProps;

// NavText
const StyledNavText = styled(NavText)`
    color: #222;
`;
StyledNavText.defaultProps = NavText.defaultProps;

export {
    StyledToggle as Toggle,
    StyledNav as Nav,
    StyledNavItem as NavItem,
    StyledNavIcon as NavIcon,
    StyledNavText as NavText,
    NavHeader,
    NavTitle
};
export default StyledSideNav;