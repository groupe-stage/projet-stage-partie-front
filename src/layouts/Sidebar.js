import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Tableau de bord",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Gestion des utilisateurs",
    href: "/user-list",
    icon: "bi bi-person-heart",
  },
  {
    title: "Gestion des contraintes",
    href: "/ContrainteList",
    icon: "bi bi-exclamation-diamond-fill",
  },
  {
    title: "Gestion des examens",
    href: "/boxComponent",
    icon: "bi bi-newspaper",
  },
  {
    title: "Gestion des salles",
    href: "/boxComponentBl",
    icon: "bi bi-buildings",
  },
  {
    title: "Gestion des classes",
    href: "/boxComponentCl",
    icon: "bi bi-person-video2",
  },
  {
    title: "Gestion des surveillances",
    href: "/forms",
    icon: "bi bi-eye-fill",
  },
  {
    title: "Gestion des UPs",
    href: "/BoxComponentUp",
    icon: "bi bi-mortarboard-fill",
  },
  
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
