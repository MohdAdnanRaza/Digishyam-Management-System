import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  GroupAdd,
  PersonAdd,
  Task,
  EventNote,
  Group,
  AddBox,
  AdminPanelSettings,
} from "@mui/icons-material";

const AdminSidebar = ({ selectedPage, onClick }) => {
  const menuItems = [
    { name: "Admin Dashboard", icon: <AdminPanelSettings />, route: "" },
    { name: " Team Management", icon: <GroupAdd />, route: "add-team-member" },
    {
      name: "Add Student Member",
      icon: <PersonAdd />,
      route: "add-student-member",
    },
    { name: "Create Task", icon: <Task />, route: "create-task" },
    { name: "Leave Approval", icon: <EventNote />, route: "leave-approval" },
    { name: "Add Client Member", icon: <Group />, route: "add-client-member" },
    {
      name: "Add Salary",
      icon: <AddBox />,
      route: "add-salary",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          position: "fixed",
          top: -7,
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.route}
            onClick={() => onClick(item.route)}
            sx={{
              mb: 1,
              bgcolor:
                selectedPage === item.route ? "primary.light" : "transparent",
              color:
                selectedPage === item.route
                  ? "primary.contrastText"
                  : "inherit",
              borderRadius: "4px",
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
