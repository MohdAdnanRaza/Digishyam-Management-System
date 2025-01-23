// import React from "react";
// import {
//   Typography,
//   Card,
//   CardContent,
//   CardHeader,
//   Button,
//   Avatar,
//   Switch,
//   Select,
//   MenuItem,
//   TextField,
//   Snackbar,
//   Alert,
//   Tabs,
//   Tab,
//   Box,
//   ThemeProvider,
//   createTheme,
//   CssBaseline,
//   Input,
// } from "@mui/material";
// import { Bell, Moon, Sun, User, Shield, Lock, Camera } from "lucide-react";
// import { Label } from "@mui/icons-material";

// const SettingsPage = () => {
//   const [activeTab, setActiveTab] = React.useState(0);
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState("");
//   const [success, setSuccess] = React.useState("");
//   const [values, setValues] = React.useState({
//     name: "",
//     email: "",
//     phone: "",
//     notifications: true,
//     darkMode: false,
//     language: "english",
//     privacy: "friends",
//     twoFactorEnabled: false,
//     avatarUrl: "",
//   });

//   const handleUpdate = async (key, value) => {
//     try {
//       setLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       setValues((prev) => ({ ...prev, [key]: value }));
//       setSuccess("Settings updated successfully");
//     } catch {
//       setError("Failed to update settings");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 800));
//       setValues((prev) => ({
//         ...prev,
//         currentPassword: "",
//         newPassword: "",
//       }));
//       setSuccess("Password updated successfully");
//     } catch (err) {
//       setError("Failed to update password");
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Create theme dynamically based on darkMode state
//   const theme = createTheme({
//     palette: {
//       mode: values.darkMode ? "dark" : "light",
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ maxWidth: 800, p: 3, mt: 10 }}>
//         <Typography variant="h4" gutterBottom>
//           Settings
//         </Typography>

//         <Tabs
//           value={activeTab}
//           onChange={(e, newValue) => setActiveTab(newValue)}
//           aria-label="settings tabs"
//         >
//           <Tab label="Account" />
//           <Tab label="Security" />
//           <Tab label="Notifications" />
//           <Tab label="Privacy" />
//         </Tabs>

//         {(error || success) && (
//           <Snackbar
//             open={Boolean(error || success)}
//             autoHideDuration={6000}
//             onClose={() => {
//               setError("");
//               setSuccess("");
//             }}
//           >
//             <Alert severity={error ? "error" : "success"}>
//               {error || success}
//             </Alert>
//           </Snackbar>
//         )}

//         {activeTab === 0 && (
//           <Card sx={{ mt: 3 }}>
//             <CardHeader
//               avatar={<User />}
//               title="Profile Information"
//               titleTypographyProps={{ variant: "h6" }}
//             />
//             <CardContent>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                 <Avatar
//                   src={values.avatarUrl}
//                   alt={values.name}
//                   sx={{ width: 64, height: 64 }}
//                 />
//                 <Button
//                   variant="outlined"
//                   component="label"
//                   startIcon={<Camera />}
//                   sx={{ ml: 2 }}
//                 >
//                   Change Avatar
//                   <input
//                     type="file"
//                     hidden
//                     onChange={(e) =>
//                       handleUpdate(
//                         "avatarUrl",
//                         URL.createObjectURL(e.target.files[0])
//                       )
//                     }
//                     accept="image/*"
//                   />
//                 </Button>
//               </Box>

//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 value={values.name}
//                 onChange={(e) => handleUpdate("name", e.target.value)}
//                 sx={{ mb: 3 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Email"
//                 type="email"
//                 value={values.email}
//                 onChange={(e) => handleUpdate("email", e.target.value)}
//                 sx={{ mb: 3 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 type="tel"
//                 value={values.phone}
//                 onChange={(e) => handleUpdate("phone", e.target.value)}
//                 sx={{ mb: 3 }}
//               />
//             </CardContent>
//           </Card>
//         )}

//         {activeTab === 1 && (
//           <Card sx={{ mt: 3 }}>
//             <CardHeader
//               avatar={<Shield />}
//               title="Security Settings"
//               titleTypographyProps={{ variant: "h6" }}
//             />
//             <CardContent>
//               <Typography variant="subtitle1">
//                 Two-Factor Authentication
//               </Typography>
//               <Switch
//                 checked={values.twoFactorEnabled}
//                 onChange={() =>
//                   handleUpdate("twoFactorEnabled", !values.twoFactorEnabled)
//                 }
//               />
//               <div className="space-y-4">
//                 <Label>Change Password</Label>
//                 <div className="space-y-2">
//                   <Input
//                     type="password"
//                     placeholder="Current Password"
//                     value={values.currentPassword}
//                     onChange={(e) =>
//                       handleUpdate("currentPassword", e.target.value)
//                     }
//                   />
//                   <Input
//                     type="password"
//                     placeholder="New Password"
//                     value={values.newPassword}
//                     onChange={(e) =>
//                       handleUpdate("newPassword", e.target.value)
//                     }
//                   />
//                 </div>
//                 <Button onClick={handlePasswordChange}>Update Password</Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {activeTab === 2 && (
//           <Card sx={{ mt: 3 }}>
//             <CardHeader
//               avatar={<Bell />}
//               title="Notification Preferences"
//               titleTypographyProps={{ variant: "h6" }}
//             />
//             <CardContent>
//               <Typography>Receive Notifications</Typography>
//               <Switch
//                 checked={values.notifications}
//                 onChange={(e) =>
//                   handleUpdate("notifications", e.target.checked)
//                 }
//               />
//             </CardContent>
//           </Card>
//         )}

//         {activeTab === 3 && (
//           <Card sx={{ mt: 3 }}>
//             <CardHeader
//               avatar={<Lock />}
//               title="Privacy Settings"
//               titleTypographyProps={{ variant: "h6" }}
//             />
//             <CardContent>
//               <Typography variant="subtitle1">Profile Visibility</Typography>
//               <Select
//                 value={values.privacy}
//                 onChange={(e) => handleUpdate("privacy", e.target.value)}
//                 fullWidth
//               >
//                 <MenuItem value="public">Public</MenuItem>
//                 <MenuItem value="friends">Friends Only</MenuItem>
//                 <MenuItem value="private">Private</MenuItem>
//               </Select>
//             </CardContent>
//           </Card>
//         )}

//         {/* Dark/Light Mode Toggle */}
//         <Card
//           sx={{
//             width: 280,
//             mt: -74,
//             ml: 90,
//             height: 150,
//           }}
//         >
//           <CardHeader
//             avatar={values.darkMode ? <Moon /> : <Sun />}
//             title="Dark Mode"
//             titleTypographyProps={{ variant: "h6" }}
//           />
//           <CardContent>
//             <Typography>Enable Dark Mode</Typography>
//             <Switch
//               checked={values.darkMode}
//               onChange={() => handleUpdate("darkMode", !values.darkMode)}
//             />
//           </CardContent>
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default SettingsPage;
import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Avatar,
  Switch,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Input,
} from "@mui/material";
import { Bell, Moon, Sun, User, Shield, Lock, Camera } from "lucide-react";
import { Label } from "@mui/icons-material";
import { useAuth } from "../../context/ContextProvider"; // Assuming the user context is set

const SettingsPage = () => {
  const { user, login } = useAuth(); // Get user from context
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [values, setValues] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    notifications: true,
    darkMode: false,
    language: "english",
    privacy: "friends",
    twoFactorEnabled: false,
    avatarUrl: "",
  });

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        notifications: user.notifications,
        darkMode: user.darkMode,
        language: user.language,
        privacy: user.privacy,
        twoFactorEnabled: user.twoFactorEnabled,
        avatarUrl: user.avatarUrl,
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/auth/edit/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess("Profile updated successfully");
        login(result.updatedUser); // Update the context with new user data
      } else {
        setError(result.message || "Failed to update profile");
      }
    } catch (error) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setValues((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
      setSuccess("Password updated successfully");
    } catch (err) {
      setError("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleDarkModeToggle = () => {
    // Toggle dark mode
    setValues((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };
  const theme = createTheme({
    palette: {
      mode: values.darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 800, p: 3, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          aria-label="settings tabs"
        >
          <Tab label="Account" />
          <Tab label="Security" />
          <Tab label="Notifications" />
          <Tab label="Privacy" />
        </Tabs>

        {(error || success) && (
          <Snackbar
            open={Boolean(error || success)}
            autoHideDuration={6000}
            onClose={() => {
              setError("");
              setSuccess("");
            }}
          >
            <Alert severity={error ? "error" : "success"}>
              {error || success}
            </Alert>
          </Snackbar>
        )}

        {activeTab === 0 && (
          <Card sx={{ mt: 3 }}>
            <CardHeader
              avatar={<User />}
              title="Profile Information"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  src={values.avatarUrl}
                  alt={values.name}
                  sx={{ width: 64, height: 64 }}
                />
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Camera />}
                  sx={{ ml: 2 }}
                >
                  Change Avatar
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        avatarUrl: URL.createObjectURL(e.target.files[0]),
                      }))
                    }
                    accept="image/*"
                  />
                </Button>
              </Box>

              <TextField
                fullWidth
                label="Full Name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                value={values.phone}
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Role"
                type="tel"
                value={values.role}
                onChange={(e) => setValues({ ...values, role: e.target.value })}
                sx={{ mb: 3 }}
              />
              <Button onClick={handleUpdate} variant="contained" sx={{ mt: 2 }}>
                Update
              </Button>
            </CardContent>
          </Card>
        )}
        {activeTab === 1 && (
          <Card sx={{ mt: 3 }}>
            <CardHeader
              avatar={<Shield />}
              title="Security Settings"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Typography variant="subtitle1">
                Two-Factor Authentication
              </Typography>
              <Switch
                checked={values.twoFactorEnabled}
                onChange={() =>
                  handleUpdate("twoFactorEnabled", !values.twoFactorEnabled)
                }
              />
              <div className="space-y-4">
                <Label>Change Password</Label>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Current Password"
                    value={values.currentPassword}
                    onChange={(e) =>
                      handleUpdate("currentPassword", e.target.value)
                    }
                  />
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={values.newPassword}
                    onChange={(e) =>
                      handleUpdate("newPassword", e.target.value)
                    }
                  />
                </div>
                <Button onClick={handlePasswordChange}>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        )}
        {activeTab === 2 && (
          <Card sx={{ mt: 3 }}>
            <CardHeader
              avatar={<Bell />}
              title="Notification Preferences"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Typography>Receive Notifications</Typography>
              <Switch
                checked={values.notifications}
                onChange={(e) =>
                  handleUpdate("notifications", e.target.checked)
                }
              />
            </CardContent>
          </Card>
        )}

        {activeTab === 3 && (
          <Card sx={{ mt: 3 }}>
            <CardHeader
              avatar={<Lock />}
              title="Privacy Settings"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Typography variant="subtitle1">Profile Visibility</Typography>
              <Select
                value={values.privacy}
                onChange={(e) => handleUpdate("privacy", e.target.value)}
                fullWidth
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="friends">Friends Only</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Dark/Light Mode Toggle */}
        <Card
          sx={{
            width: 280,
            mt: -87,
            ml: 94,
            height: 150,
          }}
        >
          <CardHeader
            avatar={values.darkMode ? <Moon /> : <Sun />}
            title="Dark Mode"
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardContent>
            <Typography>Enable Dark Mode</Typography>
            <Switch checked={values.darkMode} onChange={handleDarkModeToggle} />
          </CardContent>
        </Card>
        {/* Other tabs for Security, Notifications, Privacy */}
      </Box>
    </ThemeProvider>
  );
};

export default SettingsPage;
