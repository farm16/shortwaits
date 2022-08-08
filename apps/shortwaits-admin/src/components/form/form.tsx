import React from "react"
import { Formik } from "formik"
import { View } from "react-native"

export const Form = (props: any) => {
  const { onSubmit, initialValues, validate } = props
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {}
        if (!values.email) {
          errors.email = "Required"
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address"
        }
        return errors
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <View>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </View>
      )}
    </Formik>
  )
}
