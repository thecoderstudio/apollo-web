import React from 'react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';
import FormModal from '../../../src/components/modals/FormModal';

function getComponent(onClose, onSubmit) {
  return renderer.create(
    <FormModal
        title="Test"
        primaryActionTitle="Create"
        initialValues={{ test: '' }}
        onClose={onClose}
        onSubmit={onSubmit}>
        {(values, errors, handleChange) => {
          expect(values.test).toEqual('');
          return <p>Test form</p>;
        }}
    </FormModal>
  );
}

describe("form modal", () => {
  it("renders correctly", () => {
    const tree = getComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("closes", () => {
    const spy = jest.fn();
    const component = getComponent(spy);
    component.root.findAllByType('button')[0].props.onClick();
    expect(spy).toHaveBeenCalled();
  });

  it("submits", () => {
    const spy = jest.fn();
    const component = getComponent(null, spy);
    component.root.findAllByType(Formik)[0].props.onSubmit();
    expect(spy).toHaveBeenCalled();
  });
});
