<template>
  <form @submit.prevent="submitForm">
    <div class="form-controls" :class="{ invalid: !formData.firstName.isValid }">
      <label for="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="formData.firstName.value"
        @input="clearValidity('firstName')"
      />
      <p v-if="!formData.firstName.isValid">First Name must not be empty</p>
    </div>
    <div class="form-controls" :class="{ invalid: !formData.lastName.isValid }">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="formData.lastName.value"
        @input="clearValidity('lastName')"
      />
      <p v-if="!formData.lastName.isValid">Last Name must not be empty</p>
    </div>
    <div class="form-controls" :class="{ invalid: !formData.hourlyRate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="formData.hourlyRate.value"
        @input="clearValidity('hourlyRate')"
      />
      <p v-if="!formData.hourlyRate.isValid">Hourly rate must be greater than 0</p>
    </div>
    <div class="form-controls" :class="{ invalid: !formData.description.isValid }">
      <label for="description">Description</label>
      <textarea
        v-model="formData.description.value"
        @input="clearValidity('description')"
      ></textarea>
      <p v-if="!formData.description.isValid">Description must not be empty</p>
    </div>
    <div class="form-controls" :class="{ invalid: !formData.areas.isValid }">
      <h3>Areas of expertise:</h3>
      <div>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          value="frontend"
          v-model="formData.areas.value"
          @change="clearValidity('areas')"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          value="backend"
          v-model="formData.areas.value"
          @change="clearValidity('areas')"
        />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="career"
          id="career"
          value="career"
          v-model="formData.areas.value"
          @change="clearValidity('areas')"
        />
        <label for="career">Career</label>
      </div>
      <p v-if="!formData.areas.isValid">Atleast one area of expertise should be selected</p>
    </div>
    <div>
      <base-button mode="outline">Register</base-button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CoachForm',
  data() {
    return {
      formData: {
        firstName: {
          value: '',
          isValid: true,
        },
        lastName: {
          value: '',
          isValid: true,
        },
        hourlyRate: {
          value: null,
          isValid: true,
        },
        description: {
          value: '',
          isValid: true,
        },
        areas: {
          value: [],
          isValid: true,
        },
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this.formData[input].isValid = true;
    },
    validateForm() {
      for (const data in this.formData) {
        if (Array.isArray(this.formData[data].value) && this.formData[data].value.length === 0) {
          this.formData[data].isValid = false;
          this.formIsValid = false;
        } else if (!this.formData[data].value) {
          this.formData[data].isValid = false;
          this.formIsValid = false;
        }
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) return;

      const formData = {
        firstName: this.formData.firstName.value,
        lastName: this.formData.lastName.value,
        hourlyRate: this.formData.hourlyRate.value,
        areas: this.formData.areas.value,
        description: this.formData.description.value,
      };

      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-controls {
  margin: 0.5rem 0rem;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}
input,
textarea {
  display: block;
  border: 1px solid #ccc;
  width: 100%;
  font: inherit;
}
input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}
input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}
input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}
h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}
.invalid label {
  color: red;
}
.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
