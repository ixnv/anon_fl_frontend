import React from 'react';
import shortid from 'shortid';
import {Glyphicon, FormGroup, FormControl, ControlLabel, Button, MenuItem} from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import {toastr} from 'react-redux-toastr';

const CreateOrderForm = (props) => {
  const {updateField, title, description, price, categories, category,
    createOrder, cancel,
    tags, addTag, removeTag, tagCreationInProgress, tagInputValue,
    suggestedTag, suggestions, getSuggestionValue, fetchTagsSuggestions, clearTagsSuggestions} = props;

  const submitForm = (title, description, price, category_id) => ev => {
    ev.preventDefault();

    if (!category_id) toastr.error('Категория', 'Пожалуйста, выберите категорию');
    if (!price) toastr.error('Цена', 'Цена заказа должна быть больше нуля');

    // api требует цену * 100
    createOrder(title, description, price * 100, category_id, tags);
  };

  const tagSuggestTheme = {
    container: 'tag-suggest__container',
    input: 'form-control',
    suggestionsContainer: 'tag-suggest__suggestions-container',
    suggestionsList: 'list-group tag-suggest__suggestions',
    suggestion: 'list-group-item',
    suggestionFocused: 'tag-suggest__suggestion--focused',
  };

  const tagSuggestInputProps = {
    placeholder: 'Введите тэг',
    value: tagInputValue,
    onChange: (ev, { newValue }) => updateField('tagInputValue', newValue)
  };

  const onAddTagClick = () => {
    const isInTags = (tag) => {
      return tags.length && (tags.map(_tag => _tag['tag']).indexOf(tag) !== -1);
    };

    const isNewTag = (tag) => {
      return !(suggestedTag.tag && (tag === suggestedTag.tag));
    };

    if (isInTags(tagInputValue)) {
      toastr.error('Тэг', 'Данный тэг уже есть в списке');
      return;
    }

    addTag(isNewTag(tagInputValue), tagInputValue, suggestedTag);
  };

  return (
    <form onSubmit={submitForm(title, description, price, category)}>
      <FormGroup>
        <ControlLabel>Название</ControlLabel>
        <FormControl required type="text" placeholder="название" value={title}
          onChange={(ev) => updateField('title', ev.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Описание</ControlLabel>
        <FormControl required componentClass="textarea" placeholder="Краткое описание заказа" value={description}
          onChange={(ev) => updateField('description', ev.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Цена</ControlLabel>
        <FormControl required type="number" placeholder="100.00" value={price} min="0"
          onChange={(ev) => updateField('price', ev.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Категория</ControlLabel>
        <FormControl componentClass="select" placeholder="Категория" value={category}
          onChange={(ev) => updateField('category', ev.target.value)}>
          <option selected/>
          {
            categories.map(category => {
              return (
                <optgroup key={shortid.generate()} label={category.title}>
                  {category.subcategories.map(subcategory => {
                    return (
                      <option key={shortid.generate()} value={subcategory.id}>{subcategory.title}</option>
                    )
                  })}
                </optgroup>
              )
            })
          }
        </FormControl>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Тэги</ControlLabel>
        <div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={fetchTagsSuggestions}
            onSuggestionsClearRequested={clearTagsSuggestions}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={value => value.tag}
            inputProps={tagSuggestInputProps}
            theme={tagSuggestTheme}
          />
          <Button onClick={onAddTagClick} disabled={tagCreationInProgress}>Добавить</Button>
        </div>
      </FormGroup>
      <ul className="tags-list">
        {tags.map(tag => {
          return (
            <li key={shortid.generate()} className="tags-list__item">
              <span>{tag.tag}</span>
              <span onClick={() => removeTag(tag.id)}>
                <Glyphicon glyph="remove"/>
              </span>
            </li>
          );
        })}
      </ul>
      <FormGroup>
        <Button bsStyle="primary" type="submit">Создать</Button>
        <Button onClick={cancel}>Отмена</Button>
      </FormGroup>
    </form>
  );
};

export default CreateOrderForm;
