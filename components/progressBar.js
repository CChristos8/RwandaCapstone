// 1. It should show the progress
// 2. Show the percentage of completion in text
// 3. Color, width

import React from "react";
import PropTypes from "prop-types"

import { ProgressBar} from 'react-native-paper';
const progress_bar = () => (
   <ProgressBar style={{ marginTop:200}} progress={0.5} color="#00BCD4" />
);;

export default progress_bar;
