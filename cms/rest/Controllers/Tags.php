<?php
/**
 * Created by Ryan Potsander
 * Date: 9/29/17
 */

class MyControllerTags extends modRestController {
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


        $tagsTv = $this->modx->getObject('modTemplateVarResource', array('tmplvarid' => 32, 'contentid' => $id));
        $tags = json_decode($tagsTv->get('value'), true);

        $tagList = array();
        foreach ($tags as $tag) {

            $tagArray = array();
            $tagArray['id'] = $tag['MIGX_id'];
            $tagArray['name'] = $tag['name'];
            $tagArray['previewImage'] = $tag['image'];
            $tagArray['path'] = str_replace(' ', '-', strtolower($tag['name']));

            array_push($tagList, $tagArray);
        }


        $objectArray = $this->object->toArray();

        $objectArray['tags'] = $tagList;


        $afterRead = $this->afterRead($objectArray);
        if ($afterRead !== true && $afterRead !== null) {
            return $this->failure($afterRead === false ? $this->errorMessage : $afterRead);
        }

        return $this->success('',$objectArray);
    }

}