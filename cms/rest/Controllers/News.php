<?php

class MyControllerNews extends modRestController {
    public $classKey = 'modResource';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';

    /**
     * Abstract method for routing GET requests without a primary key passed. Must be defined in your derivative
     * controller. Handles fetching of collections of objects.
     *
     * @abstract
     * @return array
     */
    public function getList() {
        $this->getProperties();
        $c = $this->modx->newQuery($this->classKey);
        $c = $this->addSearchQuery($c);
        $c->innerJoin('modTemplateVarResource','TemplateVarResources');
        $c->innerJoin('modTemplateVar','TemplateVar','`TemplateVar`.`id` = `TemplateVarResources`.`tmplvarid`');
        $c->where(array('parent' => 270));
        $c = $this->prepareListQueryBeforeCount($c);
      
        $total = $this->modx->getCount($this->classKey,$c);
        $alias = !empty($this->classAlias) ? $this->classAlias : $this->classKey;
        $c->select($this->modx->getSelectColumns($this->classKey,$alias));

        $c = $this->prepareListQueryAfterCount($c);

        $c->sortby($this->getProperty($this->getOption('propertySort','sort'),$this->defaultSortField),$this->getProperty($this->getOption('propertySortDir','dir'),$this->defaultSortDirection));
        $limit = $this->getProperty($this->getOption('propertyLimit','limit'),$this->defaultLimit);
        if (empty($limit)) $limit = $this->defaultLimit;
        $c->limit($limit,$this->getProperty($this->getOption('propertyOffset','start'),$this->defaultOffset));
        $objects = $this->modx->getCollection($this->classKey,$c);
        if (empty($objects)) $objects = array();
        $list = array();
        /** @var xPDOObject $object */
        foreach ($objects as $object) {
            $preparedListObject = $this->prepareListObject($object);
            $uploadsPath = 'http://bluemandle2.com/~imeg/cms/assets/uploads/';
            $image = $uploadsPath . $this->getTemplateVariable($preparedListObject['id'], 65);
            $preparedListObject['image'] = $image;
            $list[] = $preparedListObject;
        }
        return $this->collection($list,$total);
    }
    
    public function getTemplateVariable($id, $tvId, $richText = false) {

        $tv = $this->modx->getObject('modTemplateVarResource', array('tmplvarid' => $tvId, 'contentid' => $id));

        if ($tv) return $tv->get('value');

        return '';

    }

}