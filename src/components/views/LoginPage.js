import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import Box from '../styledComponents/View';
import Input from '../styledComponents/TextInput';
import ButtonSty from '../styledComponents/Button';
import {useDispatch} from 'react-redux';
import * as userActions from '../../redux/actions/userActions';

const UserLoginPage = ({navigation}) => {
  const dispatch = useDispatch();

  const HandleSave = (data) => {
    navigation.navigate('Chat', {userData: data});
  };

  return (
    <Box
      flex={1}
      flexDirection="row"
      alignItems="center"
      justifyContent="center">
      <Formik
        initialValues={{Name: '', Password: ''}}
        validationSchema={yup.object().shape({
          Name: yup.string().required('Kullanıcı adı gerekli'),
          Password: yup
            .string()
            .min(6, 'Minumum 6 karakter olmalı')
            .required('Şifre gerekli'),
        })}
        onSubmit={(values) => HandleSave(values)}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          setFieldTouched,
          touched,
          isValid,
        }) => (
          <Box flex={1}>
            <Input
              ml={20}
              mr={20}
              bg="white"
              placeholder="Kulllanıcı Adı"
              height={52}
              borderWidth={1}
              borderColor={values.Name === '' && !isValid ? 'red' : '#EA7AF4'}
              placeholderTextColor="#693668"
              borderRadius="normal"
              onChangeText={handleChange('Name')}
              onBlur={() => setFieldTouched('Name')}
              value={values.Name}
            />
            {touched.Name && errors.Name && (
              // eslint-disable-next-line react-native/no-inline-styles
              <Text style={{fontSize: 12, color: 'red', marginLeft: 20}}>
                {errors.Name}
              </Text>
            )}
            <Input
              ml={20}
              mr={20}
              bg="white"
              mt={20}
              placeholder="Şifre"
              height={52}
              borderWidth={1}
              borderColor={values.name === '' && !isValid ? 'red' : '#EA7AF4'}
              placeholderTextColor="#693668"
              borderRadius="normal"
              onChangeText={handleChange('Password')}
              onBlur={() => setFieldTouched('Password')}
              value={values.Password}
            />
            {touched.Password && errors.Password && (
              // eslint-disable-next-line react-native/no-inline-styles
              <Text style={{fontSize: 12, color: 'red', marginLeft: 20}}>
                {errors.Password}
              </Text>
            )}
            <Box p={20} ml={50} mr={50}>
              <ButtonSty
                color="#EA7AF4"
                title="Giriş Yap"
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default UserLoginPage;
