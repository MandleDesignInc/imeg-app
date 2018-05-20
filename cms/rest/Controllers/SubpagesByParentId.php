<?php

class MyControllerSubpagesByParentId extends modRestController {
    public $classKey = 'modResource';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';

    public function read($id) {
        if (empty($id)) {
            return $this->failure($this->modx->lexicon('rest.err_field_ns',array(
                'field' => $this->primaryKeyField,
            )));
        }
        /** @var xPDOObject $object */
        $c = $this->getPrimaryKeyCriteria($id);
        $this->object = $this->modx->getObject($this->classKey,$c);

        if (empty($this->object)) {
            return $this->failure($this->modx->lexicon('rest.err_obj_nf',array(
                'class_key' => $this->classKey,
            )));
        }
  
        $subpageIds = $this->modx->getChildIds($id, 1, array('context' => 'web'));
                $subpages = array();

        foreach ($subpageIds as $id) {
            array_push($subpages, $this->getSubPage($id));
        }


        $objectArray = $this->object->toArray();

        $objectArray['subpages'] = $subpages;


        $afterRead = $this->afterRead($objectArray);
        if ($afterRead !== true && $afterRead !== null) {
            return $this->failure($afterRead === false ? $this->errorMessage : $afterRead);
        }

        return $this->success('',$objectArray);
    }
    
    public function getSubPage($id) {

        $page = $this->modx->getObject('modResource', $id);
        $pageArray = $page->toArray();
        
        if($pageArray['parent'] === 274 || $pageArray['parent'] === 277) {
          $pageArray['vimeoURL'] = $this->getTemplateVariable($id, 71);
        }
        
        if($pageArray['parent'] === 276) {
          $pageArray['articleImage'] = $this->getTemplateVariable($id, 72);
        }
        
        if($pageArray['parent'] === 275) {
          $pageArray['articleImage'] = $this->getTemplateVariable($id, 72);
          $pageArray['externalArticleURL'] = $this->getTemplateVariable($id, 73);  
        }
        
        $pageArray['title'] = $this->getTemplateVariable($id, 54);
        $pageArray['subtitle'] = $this->getTemplateVariable($id, 55);

        $pageArray['backgroundImage'] = $this->getTemplateVariable($id, 53);
        if ($pageArray['backgroundImage'] != "") $pageArray['backgroundImage'] = $pageArray['backgroundImage'];
        
        return $pageArray;
    }
    
    public function getTemplateVariable($id, $tvId, $richText = false) {

        $tv = $this->modx->getObject('modTemplateVarResource', array('tmplvarid' => $tvId, 'contentid' => $id));

        if ($tv) return $tv->get('value');

        return '';

    }

}