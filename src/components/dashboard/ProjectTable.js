import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

const tableData = [
  {
    avatar: user1,
    name: "Yosr Ben Amor",
    email: "YosrBenAmor@esprit.tn",
    project: "23/05/2024",
    status: "done",
    weeks: "A21",
    budget: "9h",
  },
  {
    avatar: user2,
    name: "Amin Lefi",
    email: "AminLefi@esprit.tn",
    project: "25/05/2024",
    status: "done",
    weeks: "G301",
    budget: "11h",
  },
  {
    avatar: user3,
    name: "Mayssa Hakimi",
    email: "MayssaHakimi@esprit.tn",
    project: "27/05/2024",
    status: "Done",
    weeks: "C102",
    budget: "15h",
  },
  {
    avatar: user4,
    name: "Louay Abidi",
    email: "LouayAbidi@esprit.tn",
    project: "23/05/2024",
    status: "pending",
    weeks: "H104",
    budget: "13h",
  },
  
];

const ProjectTables = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Project Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the projects
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Enseignant</th>
                <th>Date de Surveillance</th>

                <th>Status</th>
                <th>Salle</th>
                <th>Heure de début</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.project}</td>
                  <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>{tdata.weeks}</td>
                  <td>{tdata.budget}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
