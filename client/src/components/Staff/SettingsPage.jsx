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
import API_BASE_URL from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
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
    profilePicture: user?.profilePicture || "",
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
        profilePicture: user.avatarUrl,
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/auth/edit/${user._id}`,
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
                  src={values.profilePicture}
                  alt={values.name}
                  sx={{ width: 64, height: 64 }}
                />
                <Button variant="contained" component="label">
                  Upload Profile Picture
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const formData = new FormData();
                      formData.append("profilePicture", file);
                      axios
                        .post(
                          `${API_BASE_URL}/api/auth/upload-profile-picture/${user._id}`,
                          formData,
                          {
                            headers: { "Content-Type": "multipart/form-data" },
                          }
                        )
                        .then((response) => {
                          const updatedUser = {
                            ...user,
                            profilePicture: response.data.filePath,
                          };
                          login(updatedUser); // Update user in context
                          setValues((prev) => ({
                            ...prev,
                            profilePicture: response.data.filePath,
                          }));
                          toast.success(
                            "Profile picture updated successfully!"
                          );
                        })
                        .catch((error) => {
                          toast.error("Error uploading profile picture");
                        });
                    }}
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
