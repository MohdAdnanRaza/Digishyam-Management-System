// // import React from "react";
// // import { Box, Typography, Avatar, Grid } from "@mui/material";

// // const TestimonialSection = () => {
// //   return (
// //     <Box
// //       sx={{
// //         padding: "20px",
// //         margin: "20px 0",
// //         backgroundColor: "#f9f9f9",
// //         borderRadius: "10px",
// //         boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
// //       }}
// //     >
// //       <Grid container spacing={2} alignItems="center">
// //         <Grid item xs={12} md={6}>
// //           <Box display="flex" flexDirection="column" alignItems="center">
// //             <Typography variant="h4" color="primary">
// //               500+
// //             </Typography>
// //             <Typography variant="body1">Star Reviews</Typography>
// //           </Box>
// //         </Grid>
// //         <Grid item xs={12} md={6}>
// //           <Box display="flex" flexDirection="column" alignItems="center">
// //             <Typography variant="h4" color="primary">
// //               15K+
// //             </Typography>
// //             <Typography variant="body1">Customers On-boarded</Typography>
// //           </Box>
// //         </Grid>
// //       </Grid>
// //       <Box mt={3} textAlign="center">
// //         <Typography variant="body1" sx={{ fontStyle: "italic" }}>
// //           "Wonderful software. Have been using their services for the last few
// //           days and it is extremely professional and hassle-free! Thank you. Keep
// //           up your good work."
// //         </Typography>
// //         <Box mt={2} display="flex" justifyContent="center" alignItems="center">
// //           <Avatar
// //             src="https://via.placeholder.com/100"
// //             alt="CA Rahul Mistry"
// //             sx={{ width: 50, height: 50, marginRight: "10px" }}
// //           />
// //           <Box>
// //             <Typography variant="subtitle1" fontWeight="bold">
// //               CA Rahul Mistry
// //             </Typography>
// //             <Typography variant="body2">
// //               Practicing Chartered Accountant
// //             </Typography>
// //           </Box>
// //         </Box>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default TestimonialSection;
// // import React from "react";
// // import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";

// // const testimonials = [
// //   {
// //     name: "CA Rahul Mistry",
// //     title: "Practicing Chartered Accountant",
// //     image: "https://via.placeholder.com/100",
// //     quote:
// //       "Wonderful software. Have been using their services for the last few days and it is extremely professional and hassle-free! Thank you. Keep up your good work.",
// //   },
// //   {
// //     name: "John Doe",
// //     title: "Software Engineer",
// //     image: "https://via.placeholder.com/100",
// //     quote:
// //       "I have been using this service for months, and it has exceeded my expectations. Great support, reliable, and easy to use.",
// //   },
// //   {
// //     name: "Jane Smith",
// //     title: "Business Consultant",
// //     image: "https://via.placeholder.com/100",
// //     quote:
// //       "The user interface is simple and intuitive. I've recommended it to several of my colleagues. It's a game-changer.",
// //   },
// // ];

// // const TestimonialSection = () => {
// //   return (
// //     <Box
// //       sx={{
// //         padding: "20px",
// //         margin: "20px 0",
// //         backgroundColor: "#f9f9f9",
// //         borderRadius: "10px",
// //         boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
// //       }}
// //     >
// //       <Grid container spacing={2} alignItems="center">
// //         <Grid item xs={12} md={6}>
// //           <Box display="flex" flexDirection="column" alignItems="center">
// //             <Typography variant="h4" color="primary">
// //               500+
// //             </Typography>
// //             <Typography variant="body1">Star Reviews</Typography>
// //           </Box>
// //         </Grid>
// //         <Grid item xs={12} md={6}>
// //           <Box display="flex" flexDirection="column" alignItems="center">
// //             <Typography variant="h4" color="primary">
// //               15K+
// //             </Typography>
// //             <Typography variant="body1">Customers On-boarded</Typography>
// //           </Box>
// //         </Grid>
// //       </Grid>

// //       {/* Testimonials */}
// //       <Box mt={3}>
// //         <Grid container spacing={3}>
// //           {testimonials.map((testimonial, index) => (
// //             <Grid item xs={12} sm={6} md={4} key={index}>
// //               <Paper
// //                 elevation={3}
// //                 sx={{
// //                   padding: "20px",
// //                   borderRadius: "8px",
// //                   backgroundColor: "#fff",
// //                   boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
// //                 }}
// //               >
// //                 <Typography variant="body1" sx={{ fontStyle: "italic" }}>
// //                   "{testimonial.quote}"
// //                 </Typography>
// //                 <Box
// //                   mt={2}
// //                   display="flex"
// //                   justifyContent="center"
// //                   alignItems="center"
// //                 >
// //                   <Avatar
// //                     src={testimonial.image}
// //                     alt={testimonial.name}
// //                     sx={{ width: 50, height: 50, marginRight: "10px" }}
// //                   />
// //                   <Box>
// //                     <Typography variant="subtitle1" fontWeight="bold">
// //                       {testimonial.name}
// //                     </Typography>
// //                     <Typography variant="body2">{testimonial.title}</Typography>
// //                   </Box>
// //                 </Box>
// //               </Paper>
// //             </Grid>
// //           ))}
// //         </Grid>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default TestimonialSection;
// import React from "react";
// import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";

// const testimonials = [
//   {
//     name: "CA Rahul Mistry",
//     title: "Practicing Chartered Accountant",
//     image: "https://via.placeholder.com/100",
//     quote:
//       "Wonderful software. Have been using their services for the last few days and it is extremely professional and hassle-free! Thank you. Keep up your good work.",
//   },
//   {
//     name: "John Doe",
//     title: "Software Engineer",
//     image: "https://via.placeholder.com/100",
//     quote:
//       "I have been using this service for months, and it has exceeded my expectations. Great support, reliable, and easy to use.",
//   },
//   {
//     name: "Jane Smith",
//     title: "Business Consultant",
//     image: "https://via.placeholder.com/100",
//     quote:
//       "The user interface is simple and intuitive. I've recommended it to several of my colleagues. It's a game-changer.",
//   },
// ];

// const TestimonialSection = () => {
//   return (
//     <Box
//       sx={{
//         padding: "40px 20px",
//         margin: "20px 0",
//         backgroundColor: "linear-gradient(90deg, #eef2f3, #8e9eab)",
//         borderRadius: "20px",
//         boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//         textAlign: "center",
//       }}
//     >
//       <Grid container spacing={3} justifyContent="center">
//         {/* Stats Section */}
//         <Grid item xs={12} md={6}>
//           <Box textAlign="center" mb={3}>
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: "bold",
//                 color: "#1976d2",
//               }}
//             >
//               500+
//             </Typography>
//             <Typography variant="body1" color="textSecondary">
//               Star Reviews
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Box textAlign="center" mb={3}>
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: "bold",
//                 color: "#1976d2",
//               }}
//             >
//               15K+
//             </Typography>
//             <Typography variant="body1" color="textSecondary">
//               Customers On-boarded
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>

//       {/* Testimonials Section */}
//       <Box mt={4}>
//         <Grid container spacing={4} justifyContent="center">
//           {testimonials.map((testimonial, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   padding: "20px",
//                   borderRadius: "12px",
//                   backgroundColor: "#fff",
//                   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                   textAlign: "center",
//                 }}
//               >
//                 <Typography
//                   variant="body1"
//                   sx={{ fontStyle: "italic", color: "#555" }}
//                 >
//                   "{testimonial.quote}"
//                 </Typography>
//                 <Box
//                   mt={2}
//                   display="flex"
//                   flexDirection="column"
//                   alignItems="center"
//                 >
//                   <Avatar
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     sx={{ width: 60, height: 60, mb: 1 }}
//                   />
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {testimonial.name}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {testimonial.title}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default TestimonialSection;
import React from "react";
import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";

const testimonials = [
  {
    name: "Rahul Mistry",
    title: "Enterpreneur",
    image: "https://via.placeholder.com/100",
    quote:
      "Wonderful company. Have been using their services for the last few days and it is extremely professional and hassle-free!",
  },
  {
    name: "John Doe",
    title: "Software Engineer",
    image: "https://via.placeholder.com/100",
    quote:
      "I have been using this service for months, and it has exceeded my expectations. Great support, reliable, and easy to use.",
  },
  {
    name: "Jane Smith",
    title: "Business Consultant",
    image: "https://via.placeholder.com/100",
    quote:
      "The user interface is simple and intuitive. I've recommended it to several of my colleagues. It's a game-changer.",
  },
];

const TestimonialSection = () => {
  return (
    <Box
      sx={{
        width: "90%",
        padding: "40px 20px",
        margin: "20px 0",
        backgroundColor: "linear-gradient(90deg, #eef2f3, #8e9eab)",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {/* Stats Section */}
        <Grid item xs={12} md={6}>
          <Box textAlign="center" mb={3}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
              }}
            >
              500+
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Star Reviews
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box textAlign="center" mb={3}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
              }}
            >
              15K+
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Customers On-boarded
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Testimonials Section */}
      <Box mt={4}>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  width: "80%",
                  borderRadius: "12px",
                  margin: "0 auto",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontStyle: "italic", color: "#555" }}
                >
                  "{testimonial.quote}"
                </Typography>
                <Box
                  mt={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{ width: 60, height: 60, mb: 1 }}
                  />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {testimonial.title}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TestimonialSection;
