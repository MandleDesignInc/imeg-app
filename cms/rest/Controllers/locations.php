<?php
/**
 * User: Justin McDanel
 * Date: 5/20/18
 */

class MyControllerLocations extends modRestController {
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

        $locations = $this->modx->getObject('modTemplateVarResource', array('tmplvarid' => 75, 'contentid' => $id));

        $locationsValue = json_decode($locations->get('value'));


        $objectArray = Array();
        if ($locations) $objectArray['locations'] = $locationsValue;


        $afterRead = $this->afterRead($objectArray);
        if ($afterRead !== true && $afterRead !== null) {
            return $this->failure($afterRead === false ? $this->errorMessage : $afterRead);
        }

        return $this->success('',$objectArray);
    }

}
